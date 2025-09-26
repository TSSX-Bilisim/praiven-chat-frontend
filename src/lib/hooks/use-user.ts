import { useUserStore } from "../stores/user";
import { fetchUser } from "../api/user";

const useUser = () => {
    const { user, setUser } = useUserStore();

    const fetchAndSetUser = async () => {
        try {
        const response = await fetchUser();
        if (!response.success) throw new Error("Failed to fetch user");
        if (response.data?.user) setUser(response.data?.user);
        } catch (error) {
        console.error(error);
        }
    };

    return { user, fetchAndSetUser };
};

export default useUser;
