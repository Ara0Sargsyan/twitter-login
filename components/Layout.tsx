import { ReactNode } from "react";

interface ILayoutProps {
    children: ReactNode;
}

export default function Layout(props: ILayoutProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 dark:bg-gray-900">
            <div className="text-4xl text-slate-900 font-medium py-4 text-center 2xl:text-6xl dark:text-white">
                Your Tweets
            </div>
            <main
                className="flex flex-col items-center justify-center w-full flex-1 xl:px-60 lg:px-10 md:px-10 text-center">
                {props.children}
            </main>
        </div>
    )
}
