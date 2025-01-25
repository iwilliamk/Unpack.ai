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
    try {
      if (!this.validateFile(file)) {
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
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
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