import { Client, Databases, Query, Storage, ID } from 'appwrite'
import { conf } from '../conf/conf'
import uploadImageToCloudinary from '../cloudinary/uploadOnCloud'
import retrieveFromCloud from '../cloudinary/retrieveFromCloud'

export class Services{
    client = new Client()
    databases
    bucket

    constructor() {
        this.client
            .setEndpoint(conf.url)
            .setProject(conf.projectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
            
    }

    async createPosts({title, slug, content, status, thumbnail, userId}) {
        try {
            return await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug, 
                {
                    title, content, thumbnail, status, userId
                }
            )
        } catch (error) {
            console.log('Error occured while creating your post: ', error)
        }
    }

    async updatePosts(slug, {title, content, thumbnail, status, userId}) {
        try {
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title, content, thumbnail, status, userId 
                }
            )
        } catch (error) {
            console.log('Error occured while updating your post: ', error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
            return true
        } catch (error) {
            console.log('Error occured while deleting your post: ', error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
        } catch (error) {
            console.log('Error occured while retrieving your post: ', error)
            return false
        }
    }

    async getAllPosts(queries = []) {
        try {
            return await this.databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                queries
            )
        } catch (error) {
            console.log('Error occured while retrieving all your post: ', error)
            return false
        }
    }

    async uploadImage(file) {
        try {
            // return uploadImageToCloudinary(file)
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log('Error occured while uploading your thumbnail: ', error)
        }
    }

    async deleteImage(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.bucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log('Error occured while deleting your thumbnail: ', error)
            return false
        }
    }

    getFilePreview(fileId) {
        //return retrieveFromCloud(fileId)
        const temp = this.bucket.getFilePreview(
            conf.bucketId,
            fileId
        )
        // console.log('File preview URL: ', temp);
        return temp;
    }
}

export const services = new Services()

