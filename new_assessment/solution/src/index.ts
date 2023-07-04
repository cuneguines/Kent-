import axios, { AxiosInstance } from 'axios';

// Configuration
const baseUrl = 'https://ea1.aconex.com'; // Aconex base URL
const loginName = 'poleary'; // Aconex login name
const password = 'Auth3nt1c'; // Aconex password
const sourceProjectId = '123'; // Source project ID
const destinationProjectId = '456'; // Destination project ID

// Initialize Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

// Login to Aconex
async function login(): Promise<string> {
  const response = await apiClient.post('/Logon', { loginName, password });
  const authToken = response.headers['x-auth-token'];
  return authToken;
}

// Upload a document to a project
async function uploadDocument(authToken: string, projectId: string, document: any): Promise<string> {
  const response = await apiClient.post(`/api/projects/${projectId}/documents`, document, {
    headers: {
      'x-auth-token': authToken,
    },
  });
  const documentId = response.data.id;
  return documentId;
}

// Transfer documents from source project to destination project
async function transferDocuments(): Promise<void> {
  try {
    // Login and get authentication token
    const authToken = await login();

    // Upload documents to source project
    const document1 = { title: 'Document 1', file: 'path/to/document1.pdf' };
    const document2 = { title: 'Document 2', file: 'path/to/document2.pdf' };
    const document1Id = await uploadDocument(authToken, sourceProjectId, document1);
    const document2Id = await uploadDocument(authToken, sourceProjectId, document2);

    // Transfer documents to destination project
    await apiClient.post(`/api/projects/${sourceProjectId}/documents/${document1Id}/transfer`, {
      projectId: destinationProjectId,
    });
    await apiClient.post(`/api/projects/${sourceProjectId}/documents/${document2Id}/transfer`, {
      projectId: destinationProjectId,
    });

    console.log('Documents transferred successfully!');
  } catch (error) {
    console.error('Error transferring documents:', error);
  }
}

// Run the transferDocuments function
transferDocuments();
