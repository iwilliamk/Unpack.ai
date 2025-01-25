import { toast } from 'sonner';

interface ProcessedFile {
  id: string;
  name: string;
  content: string;
  type: string;
  size: number;
  hash: string;
  timestamp: Date;
}

class FileProcessingService {
  private static readonly ALLOWED_EXTENSIONS = ['.txt', '.js', '.py', '.cpp', '.c', '.h', '.cs', '.java', '.rb', '.php'];
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024;

  async processFile(file: File): Promise<ProcessedFile | null> {
    console.log('DEBUG: processFile called in fileProcessing.ts', { fileName: file.name, fileType: file.type });
    try {
      if (!this.validateFile(file)) {
        console.log('DEBUG: File validation failed');
        return null;
      }

      const content = await this.readFileContent(file);
      const hash = await this.generateHash(content);

      return {
        id: crypto.randomUUID(),
        name: file.name,
        content,
        type: file.type,
        size: file.size,
        hash,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error('Failed to process file');
      return null;
    }
  }

  private validateFile(file: File): boolean {
    if (file.size > FileProcessingService.MAX_FILE_SIZE) {
      toast.error('File size exceeds 10MB limit');
      return false;
    }

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!FileProcessingService.ALLOWED_EXTENSIONS.includes(fileExtension)) {
      toast.error('Unsupported file type');
      return false;
    }

    return true;
  }

  private async readFileContent(file: File): Promise<string> {
    try {
      const maxRetries = 3;
      let lastError = null;

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          const content = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            
            const timeoutId = setTimeout(() => {
              reader.abort();
              reject(new Error('File read timeout'));
            }, 30000); // 30 second timeout
            
            reader.onload = () => {
              clearTimeout(timeoutId);
              if (typeof reader.result === 'string') {
                resolve(reader.result);
              } else {
                reject(new Error('Invalid file content'));
              }
            };
            
            reader.onerror = () => {
              clearTimeout(timeoutId);
              reject(new Error('Failed to read file'));
            };
            
            reader.readAsText(file);
          });
          
          if (!content) {
            throw new Error('Empty file content');
          }
          
          return content;
        } catch (error) {
          console.warn(`Attempt ${attempt + 1} failed:`, error);
          lastError = error;
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
        }
      }
      
      throw lastError || new Error('Failed to read file after multiple attempts');
    } catch (error) {
      console.error('File reading error:', error);
      throw error;
    }
  }

  private async generateHash(content: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}

export const fileProcessingService = new FileProcessingService();