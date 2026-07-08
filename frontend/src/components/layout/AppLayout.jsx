import {
  Drawer,
  Grid,
  Skeleton,
} from "@mui/material";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
  useParams,
} from "react-router-dom";


import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../constants/events";


import {
  useErrors,
  useSocketEvents,
} from "../../hooks/hook";


import {
  getOrSaveFromStorage,
} from "../../lib/features";


import {
  useMyChatsQuery,
} from "../../redux/api/api";


import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";


import {
  setIsDeleteMenu,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";


import {
  getSocket,
} from "../../socket";


import DeleteChatMenu from "../dialogs/DeleteChatMenu";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";



const AppLayout = () => (WrappedComponent) => {

  return (props) => {


    const params = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();


    const socket = getSocket();


    
    


    

    const chatId = params.chatId;



    const deleteMenuAnchor = useRef(null);



    const [onlineUsers, setOnlineUsers] =
      useState([]);



    const [openProfile, setOpenProfile] =
      useState(false);



    const toggleProfile = () => {

      setOpenProfile((prev)=>!prev);

    };



    const {
      user,
    } = useSelector(
      (state)=>state.auth
    );



    const {
      newMessagesAlert,
    } = useSelector(
      (state)=>state.chat
    );
        /*
      MOBILE SCREEN DETECTION
    */

    




    const {
      isLoading,
      data,
      isError,
      error,
      refetch,

    } = useMyChatsQuery("");



    useErrors([
      {
        isError,
        error
      }
    ]);




    useEffect(()=>{

      getOrSaveFromStorage({

        key:NEW_MESSAGE_ALERT,

        value:newMessagesAlert,

      });


    },[
      newMessagesAlert
    ]);





    const handleDeleteChat = (

      e,

      chatId,

      groupChat

    )=>{


      dispatch(
        setIsDeleteMenu(true)
      );


      dispatch(
        setSelectedDeleteChat({

          chatId,

          groupChat,

        })
      );


      deleteMenuAnchor.current =
        e.currentTarget;


    };





    const newMessageAlertListener =
      useCallback(

        (data)=>{


          if(data.chatId === chatId)
            return;



          dispatch(
            setNewMessagesAlert(data)
          );


        },

        [
          chatId,
          dispatch
        ]

      );





    const newRequestListener =
      useCallback(()=>{


        dispatch(
          incrementNotification()
        );


      },[
        dispatch
      ]);





    const refetchListener =
      useCallback(()=>{


        refetch();


        navigate("/");


      },[
        navigate,
        refetch
      ]);





    const onlineUsersListener =
      useCallback(

        (data)=>{


          setOnlineUsers(data);


        },

        []

      );





    const eventHandlers = {


      [NEW_MESSAGE_ALERT]:

        newMessageAlertListener,



      [NEW_REQUEST]:

        newRequestListener,



      [REFETCH_CHATS]:

        refetchListener,



      [ONLINE_USERS]:

        onlineUsersListener,


    };





    useSocketEvents(

      socket,

      eventHandlers

    );
    {/* ================= PROFILE DRAWER ================= */}
    return (
<>
  <Title />

  <Header />


  <DeleteChatMenu
    dispatch={dispatch}
    deleteMenuAnchor={deleteMenuAnchor}
  />



  {/* ================= MAIN LAYOUT ================= */}

  <Grid

    container

    sx={{

      height:"calc(100dvh - 4.5rem)",

      overflow:"hidden",

      background:
        "linear-gradient(180deg,#020617,#0F172A)",

    }}

  >



    {/* ================= MOBILE CHAT LIST ================= */}


    <Grid

      item

      xs={12}

      sx={{

        display:{

          xs: chatId ? "none" : "block",

          sm:"none",

        },


        height:"100%",

        overflow:"hidden",

        background:"#0F172A",

      }}

    >


      {
        isLoading ? (

          <Skeleton

            variant="rectangular"

            width="100%"

            height="100%"

            animation="wave"

          />

        ) : (

          <ChatList

            w="100%"

            chats={data?.chats}

            chatId={chatId}

            handleDeleteChat={
              handleDeleteChat
            }

            newMessagesAlert={
              newMessagesAlert
            }

            onlineUsers={
              onlineUsers
            }

          />

        )

      }


    </Grid>





    {/* ================= DESKTOP CHAT LIST ================= */}


    <Grid

      item

      sm={4}

      md={3}

      sx={{

        display:{

          xs:"none",

          sm:"block",

        },


        height:"100%",


        overflow:"hidden",


        borderRight:
          "1px solid #1E293B",


        background:"#0F172A",

      }}

    >



      {
        isLoading ? (

          <Skeleton

            variant="rectangular"

            width="100%"

            height="100%"

            animation="wave"

          />

        ) : (

          <ChatList

            chats={data?.chats}

            chatId={chatId}

            handleDeleteChat={
              handleDeleteChat
            }

            newMessagesAlert={
              newMessagesAlert
            }

            onlineUsers={
              onlineUsers
            }

          />

        )

      }


    </Grid>






    {/* ================= CHAT WINDOW ================= */}


    <Grid

      item

      xs={12}

      sm={8}

      md={9}


      sx={{

        height:"100%",


        minHeight:0,


        display:{


          xs:

            chatId

            ? "flex"

            : "none",


          sm:"flex",


        },


        flexDirection:"column",


        overflow:"hidden",


        background:"#020617",


      }}

    >



      <WrappedComponent

        {...props}

        chatId={chatId}

        user={user}

        toggleProfile={
          toggleProfile
        }

      />


    </Grid>
    {/* ================= PROFILE DRAWER ================= */}


    <Drawer

      anchor="right"


      open={openProfile}


      onClose={
        ()=>setOpenProfile(false)
      }


      transitionDuration={250}


      PaperProps={{

        sx:{


          width:{

            xs:"100%",

            sm:360,

            md:400,

          },


          height:"100dvh",


          overflowY:"auto",


          bgcolor:"#0F172A",


          borderLeft:
            "1px solid #1E293B",


          p:2,


        }

      }}


    >


      <Profile user={user} />


    </Drawer>





  </Grid>


</>

);


  };

};


export default AppLayout;
