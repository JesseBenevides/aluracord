import { useState } from 'react';
import ChatContext from './ChatContext';

function ChatContextProvider( { children }) {
  const [username, setUsername] = useState('GitHub');
  const [listaDeMensagens, setListaDeMensagens] = useState([]);

  const contextValue = {
    user: {
      username,
      setUsername,
    },
    chat: {
      listaDeMensagens,
      setListaDeMensagens,
    },
  }

 return (
   <ChatContext.Provider value={ contextValue }>
     { children }
   </ChatContext.Provider>
 );
}

export default ChatContextProvider;
