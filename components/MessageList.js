import { Box, Text, Image } from '@skynexui/components';
import appConfig from '../config.json';

function MessageList({ mensagens }) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px'
      }}
    >
      {mensagens.map((mensagem) => (
        <Text
          key={ mensagem.id }
          tag="li"
          styleSheet={{
            borderRadius: '5px',
            padding: '6px',
            marginBottom: '12px',
            hover: {
              backgroundColor: appConfig.theme.colors.neutrals[700]
            }
          }}
        >
          <Box
            styleSheet={{
              marginBottom: '8px'
            }}
          >
            <Image
              styleSheet={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '8px'
              }}
              src={`https://github.com/${mensagem.from}.png`}
            />
            <Text tag="strong">{ mensagem.from }</Text>
            <Text
              styleSheet={{
                fontSize: '10px',
                marginLeft: '8px',
                color: appConfig.theme.colors.neutrals[300]
              }}
              tag="span"
            >
              {new Date().toLocaleDateString()}
              {/* { mensagem.created_at } */}
            </Text>
          </Box>
          { mensagem.text }
        </Text>
      ))}
    </Box>
  );
}

export default MessageList;
