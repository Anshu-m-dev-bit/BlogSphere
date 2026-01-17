import { conf } from "../conf/conf";
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client()
    account

    constructor(){
        this.client
            .setEndpoint(conf.url)
            .setProject(conf.projectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
          const newUser = await this.account.create(
            ID.unique(),
            email,
            password,
            name
          )
      
          return newUser
        } catch (error) {
          if (error.code === 409) {
            throw new Error('Account already exists')
          }
      
          console.log('Error occurred while creating an account:', error)
          throw error
        }
      }      

    async loginAccount({email, password}) {
        try {
            return await this.account.createEmailPasswordSession({email, password})
        } catch (error) {
            console.log('Error occured while logging into your account:', error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log('Error occured while fetching your account: ', error)
            throw error;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log('Error occured while logging out of your account: ', error)
        }
    }
}

export const authService = new AuthService()