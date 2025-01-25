# unpack.ai - AI-Powered Malware Analysis Platform

## Overview
unpack.ai is a sophisticated web-based platform that combines secure file processing with AI-powered analysis to help developers and security professionals analyze potentially malicious code. The platform uses Google's Gemini AI to provide intelligent insights while maintaining strict security measures.

## Features
- Secure file upload and processing
- Sandboxed code execution environment
- AI-powered code analysis using Google's Gemini AI
- Support for multiple programming languages
- Real-time chat interface for AI interaction
- Detailed code analysis reports

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- A Google Cloud Platform account for Gemini AI API access

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/unpack.ai.git
   cd unpack.ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Configuration
The platform can be configured through several environment variables:

- `VITE_GEMINI_API_KEY`: Your Google Gemini AI API key
- `VITE_MAX_FILE_SIZE`: Maximum file size in bytes (default: 10MB)
- `VITE_SANDBOX_TIMEOUT`: Sandbox execution timeout in ms (default: 5000)

## Usage
1. Access the platform through your web browser
2. Upload code files using the drag-and-drop interface
3. Wait for the initial analysis to complete
4. Interact with the AI through the chat interface for deeper analysis
5. View detailed reports and recommendations

## Security Features
- File integrity verification using SHA-256 hashing
- Sandboxed code execution environment
- Strict file type restrictions
- Memory usage controls
- API access restrictions

## API Reference
The platform exposes several endpoints for programmatic access:

```
POST /api/files/upload
POST /api/analysis/start
POST /api/ai/analyze
```

## Contributing
Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Support
For support, please open an issue in the GitHub repository or contact the development team.