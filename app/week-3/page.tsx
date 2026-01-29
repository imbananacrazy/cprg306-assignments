import ItemList from "./item-list"

export default function Page() {
    return (
        <main className="bg-[#141515] text-white flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold pb-8">Shopping List</h1>
            <ItemList />
        </main>
    )
}