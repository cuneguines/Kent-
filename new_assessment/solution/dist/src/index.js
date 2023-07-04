"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// Configuration
const baseUrl = 'https://ea1.aconex.com'; // Aconex base URL
const loginName = 'poleary'; // Aconex login name
const password = 'Auth3nt1c'; // Aconex password
const sourceProjectId = '123'; // Source project ID
const destinationProjectId = '456'; // Destination project ID
// Initialize Axios instance
const apiClient = axios_1.default.create({
    baseURL: baseUrl,
});
// Login to Aconex
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield apiClient.post('/Logon', { loginName, password });
        const authToken = response.headers['x-auth-token'];
        return authToken;
    });
}
// Upload a document to a project
function uploadDocument(authToken, projectId, document) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield apiClient.post(`/api/projects/${projectId}/documents`, document, {
            headers: {
                'x-auth-token': authToken,
            },
        });
        const documentId = response.data.id;
        return documentId;
    });
}
// Transfer documents from source project to destination project
function transferDocuments() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Login and get authentication token
            const authToken = yield login();
            // Upload documents to source project
            const document1 = { title: 'Document 1', file: 'path/to/document1.pdf' };
            const document2 = { title: 'Document 2', file: 'path/to/document2.pdf' };
            const document1Id = yield uploadDocument(authToken, sourceProjectId, document1);
            const document2Id = yield uploadDocument(authToken, sourceProjectId, document2);
            // Transfer documents to destination project
            yield apiClient.post(`/api/projects/${sourceProjectId}/documents/${document1Id}/transfer`, {
                projectId: destinationProjectId,
            });
            yield apiClient.post(`/api/projects/${sourceProjectId}/documents/${document2Id}/transfer`, {
                projectId: destinationProjectId,
            });
            console.log('Documents transferred successfully!');
        }
        catch (error) {
            console.error('Error transferring documents:', error);
        }
    });
}
// Run the transferDocuments function
transferDocuments();
