import useSWR from 'swr'
import { signOut } from "next-auth/react";
import { useEffect, useState } from 'react';
import { connect } from '../logic';

const fetcher = (...args: string[]) => {
    let api = args[0]
    return fetch(api).then(res => res.json());
}

export default function Followers() {
    const { data } = useSWR('/api/twitter/user', fetcher,
        { refreshInterval: 0, revalidateOnFocus: false }
    );
    const [selectedTweetsId, setSelectedTweetsId] = useState<string[]>([])
    const [cheked, setCheked] = useState(false)


    useEffect(() => {
        connect()
    }, [])


    const connectWallet = async () => {
        const { web3AccountsSubscribe, web3Enable, isWeb3Injected } = await import('@polkadot/extension-dapp');
        const injectedExtensions = await web3Enable('twitter-dapp-subsocial')
        if (!isWeb3Injected) {
            alert('Browser do not have any polkadot extension')
            return;
        }

        if (!injectedExtensions.length) {
            alert('Polkadot Extension have not authorized us to get accounts');
            return;
        }

        await web3AccountsSubscribe(async (accounts) => {
            console.log("🚀 ~ file: Tweets.tsx ~ line 33 ~ awaitweb3AccountsSubscribe ~ accounts", accounts)
            if (accounts.length > 0) {
                const addresses = accounts.map((account) => account.address)
                console.log(addresses)
            }
        })
    }

    if (data && data.error && data.error.errors[0] && data.error.errors[0].code === 89) {
        signOut();
    }

    if (!data) return <div> Loading... </div>;


    const addSelectedId = (id: string) => {
        setCheked(true)
        const newArr: string[] = selectedTweetsId
        newArr.push(id)
        setSelectedTweetsId(newArr)
    }

    const removeSelectedId = (id: string) => {
        setCheked(false)
        const newArr = selectedTweetsId.filter(el => el !== id)
        setSelectedTweetsId(newArr)
    }

    const chek = (id: string) => {
        cheked ? removeSelectedId(id) : addSelectedId(id)
    }

    // const fnc = async () => {
    // const mnemonic = 'bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice'
    // const authHeader = generateCrustAuthToken(mnemonic)
    // console.log("🚀 ~ file: Tweets.tsx ~ line 43 ~ Followers ~ authHeader", authHeader)
    //     const api = await SubsocialApi.create({
    //         substrateNodeUrl: 'wss://rco-para.subsocial.network',
    //         ipfsNodeUrl: 'https://crustwebsites.net'
    //     })

    //     api.ipfs.setWriteHeaders({
    //         authorization: 'Basic ' + authHeader
    //     })

    //     const pair = keyring.addFromMnemonic(mnemonic)

    //     const cid = await ipfs.saveContent({
    //         title: "What is Subsocial?",
    //         image: null,
    //         tags: ['Hello world', 'FAQ'],
    //         body: 'Subsocial is an open protocol for decentralized social networks and marketplaces. It`s built with Substrate and IPFS.',
    //         canonical: 'htpps://twitter.com'
    //     })
    //     const substrateApi = await api.blockchain.api

    //     const spaceId = '10102' // The space in which you're posting.

    //     const postTransaction = substrateApi.tx.posts.createPost(
    //         spaceId,
    //         { RegularPost: null }, // Creates a regular post.
    //         IpfsContent(cid)
    //     )

    //     postTransaction.signAndSend(pair)

    // }


    return (
        <div>
            {data.data.tweets?.map((tweet: any) => (
                <label htmlFor="default-checkbox" key={tweet.id} className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{tweet.text}</h5>
                    <div className="flex items-center mb-4">
                        <input onClick={() => chek(tweet.id)} id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select tweet</label>
                    </div>
                </label>
            ))}
            <div className='mt-6' >
                <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={connectWallet}>
                    Backup
                </button>
            </div>
        </div>
    )
}
