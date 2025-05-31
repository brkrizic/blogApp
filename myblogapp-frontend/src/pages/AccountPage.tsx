import { useOutletContext } from "react-router-dom";

type ContextType = {
    searchQuery: string;
}

const AccountPage = () => {

    const { searchQuery } = useOutletContext<ContextType>();

    console.log(searchQuery);

    return(
        <div className="flex">

        {/* Main content */}
        <div>
            <h1 className="text-2xl font-bold mb-4">Welcome to your dashboard</h1>
            <p>Your dashboard content goes here.</p>
        </div>

        </div>
    );
}
export default AccountPage;