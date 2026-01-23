export const conf = {
    url: String(import.meta.env.VITE_ENDPOINT),
    projectId: String(import.meta.env.VITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_DATABASE_ID),
    collectionId: String(import.meta.env.VITE_COLLECTION_ID),
    bucketId: String(import.meta.env.VITE_BUCKET_ID),
    cloudName: String(import.meta.env.VITE_CLOUDNAME),
    uploadPreset: String(import.meta.env.VITE_UPLOAD_PRESET),
}