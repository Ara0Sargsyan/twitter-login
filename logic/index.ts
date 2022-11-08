import { ISubsocialApi, SubsocialApi } from '@subsocial/api'
import config from './config'


// let flatApi: ISubsocialApi

export const connect = async () => {
    console.log(".....conacting")
    const api = await SubsocialApi.create(config)
}
