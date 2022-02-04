import React, { useEffect, useState } from 'react';
import { Box, Text, TextField, Image } from '@skynexui/components';
import Header from '../components/Header';
import MessageList from '../components/MessageList';
import appConfig from '../config.json';
import { fetchMessages, listetingMessagesInRealTime, sendMessages } from '../services/supabase';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../components/ButtonSendSticker';

function ChatPage() {
  const [mensagem, setMensagem] = useState('');
  const [listaDeMensagens, setListaDeMensagens] = useState([]);
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    async function getMessages() {
      const messages = await fetchMessages();
      setListaDeMensagens(messages);
    }

    getMessages();
  
    const subscription = listetingMessagesInRealTime((novaMensagem) => {
      setListaDeMensagens((valorAtualDaLista) => {
        return [
          novaMensagem,
          ...valorAtualDaLista,
        ];
      });
    });

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  function handleNewMessage(message) {
    const newMessage = {
      from: username,
      text: message,
    };
    sendMessages(newMessage)
      .then((data) => {
        setListaDeMensagens([
          data,
          ...listaDeMensagens
        ]);
      });

    setMensagem('');
  }

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px'
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px'
          }}
        >
          <MessageList mensagens={ listaDeMensagens } />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TextField
              value={mensagem}
              onChange={event => {
                setMensagem(event.target.value);
              }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleNewMessage(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200]
              }}
            />
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                handleNewMessage(':sticker: ' + sticker);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );

}

export default ChatPage;
