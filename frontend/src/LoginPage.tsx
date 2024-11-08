import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "./context/AuthContext";
import useDisclosure from "./hooks/use-disclosure.hook";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { Loader2 } from "lucide-react";
import { Input } from "./components/ui/input";
import PageWrapper from "./components/common/page-wrapper";
import { Icons } from "./components/common/icons";
// import { createUser, findUser } from "./lib/user";
import { notification } from "./utils/notification";
import { Button } from "./components/ui/button";


const loginFormSchema = object({
  name: string().required("Telegram username is required"),
  // phoneNumber: string().required("Phone number is required"),
  // password: string().required("Password is required"),
}).required();

//@ts-ignore
const LoginPage = ({ setAuthToken, authToken, handleLogout }) => {
  console.log("LoginPage component rendered: ", authToken);
  const navigate = useNavigate();
  //@ts-ignore
  const { authenticate, getUserDetails, createWallet } = useOkto();
  //@ts-ignore
  const { userGroupId, setUserGroupId, setUser, user, setTransactions, userDetails, setUserDetails, baseAddress, setBaseAddress } =
    useAuthContext();
  const [loading, setLoading] = useState(false);
  const [_idToken, set_IdToken] = useState();
  const [wallets, setWallets] = useState(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [users, setUsers] = useState<any>();



  //@ts-ignore
  const {
    isOpen,
    // onOpen
  } = useDisclosure();
  //@ts-ignore
  const {
    //@ts-ignore
    register,
    //@ts-ignore
    handleSubmit,
    //@ts-ignore
    // formState: { errors },
  } = useForm<
    FormData>
  {
    resolver: yupResolver(loginFormSchema)
  };


  //@ts-ignore
  const handleGoogleLogin = async (credentialResponse) => {
    console.log("Google login response:", credentialResponse);
    const idToken = credentialResponse.credential;
    set_IdToken(idToken);
    console.log("google idtoken: ", idToken);
    //@ts-ignore
    authenticate(idToken, async (authResponse, error) => {
      if (authResponse) {
        console.log("Authentication check: ", authResponse);
        setAuthToken(authResponse.auth_token);
        console.log("auth token received", authToken);
        // navigate("/home");
        // const details = await getUserDetails();
        // setUserDetails(details);
        // console.log("User Details is", userDetails);
      }
      if (error) {
        console.error("Authentication error:", error);
      }
    });
  };


  const fetchWallets = async () => {
    try {
      const walletsData = await createWallet();
      console.log(walletsData)
      console.log(`Base wallet is`, walletsData?.wallets[2]?.address)
      setBaseAddress(walletsData?.wallets[2]?.address);
      setWallets(walletsData);
      setActiveSection('wallets');


    } catch (error) {
      //@ts-ignore
      setError(`Failed to fetch wallets: ${error.message}`);
    }
  };

  const onSubmit = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      // router.replace(routes.dashboard);
      console.log(userName);
      if (!userName) {
        console.error('Enter your telegram username');
        setLoading(false);

        return;
      }
      const params = {
        address: String(baseAddress),
        username: String(userName),
      };

      const isUser = await fetchUser(userName);
      if (isUser) {
        setUser(isUser);
      } else {
        const user = await createUser(params);
        setUser(user);
        navigate("/dashboard/dashboard/page");
      }
      navigate('/dashboard/dashboard/page');
      setLoading(false);
      notification.success("Signup Successful");

    } catch (error) {
      console.log(error);
      setLoading(false);
      notification.error("Signup Failed");
    }
    // router.push("/dashboard");
  };
  const fetchUser = async (username: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const user = await response.json();
        console.log(user);
        return user;
      } else {
        console.error('Failed to fetch user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createUser = async (params: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ params }),
      });

      if (response.ok) {
        const newUser = await response.json();
        console.log(newUser);
        return newUser;
      } else {
        console.error('Failed to create user');
      }
    } catch (e) {
      console.error('Error:', e);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, [authToken, _idToken])




  return (
    <main
      className="grid h-screen place-items-center bg-[#34581C] bg-[url('/img/bg.jpeg')] bg-cover bg-center bg-no-repeat text-white bg-blend-multiply"
    // style={{ backgroundImage: "url('/img/bg.jpeg')" }}
    >
      <PageWrapper className="flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center gap-x-2">
            <Icons.logo className="h-12 w-12" />
            <p className="text-xl font-medium">SavvyCircle</p>
          </div>
          {/* <p className="text-center font-medium leading-[18px]">
            SavvyCircle is a dApp for group savings and loans with Telegram
            integration, offering secure, automated transactions via blockchain.
          </p> */}
        </div>
        {/** @ts-ignore */}
        <div>
          {!authToken ? (
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              //@ts-ignore
              onError={(error) => {
                console.log("Login Failed", error);
              }}
              useOneTap
              promptMomentNotification={(notification) =>
                console.log("Prompt moment notification:", notification)
              }
            />
          ) : (
            // <button onClick={onLogoutClick}>Authenticated, Logout</button>
            <form onSubmit={onSubmit} className="w-full mt-4 space-y-[21px]">
              <p>Input Your Telegram Username</p>
              <div className="space-y-4">
                <div className="grid gap-y-1">
                  <div className="relative rounded bg-[#F8FDF5]">
                    {/**@ts-ignore */}
                    <Input
                      className="h-[54px] rounded pl-9"
                      placeholder="Telegram username"
                      onChange={(e) => setUserName(e.target.value)}
                    // {...register("name")}
                    />
                    {/* <Icons.profile className="absolute left-0 top-2 m-2.5 h-5 w-5 text-muted-foreground" /> */}
                  </div>
                  {/* <FormErrorTextMessage errors={errors.name} /> */}
                </div>
              </div>
              <Button
                className="bg-white text-black"
              // onClick={onOpen} disabled={isOpen}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {!loading && "Sign"}
              </Button>
            </form>
          )}

          {/**@ts-ignore */}

        </div>
      </PageWrapper>
    </main>
  );
};
export default LoginPage;
