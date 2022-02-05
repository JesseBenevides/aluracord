import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU4NDY1NCwiZXhwIjoxOTU5MTYwNjU0fQ.qlF7iDuxQrKj97hj54wXjkgIjh-r-BU6gHchY7Pr7z0';

const SUPABASE_URL = 'https://dqkrvqsrotcnqcvzqnfj.supabase.co';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function fetchMessages() {
  const { data } = await supabaseClient
    .from('messages')
    .select('*')
    .order('id', { ascending: false });

  return data;
}

export async function sendMessages(message) {
  const { data } = await supabaseClient
    .from('messages')
    .insert([message]);
  
    return data[0];
}

export function listetingMessagesInRealTime(adicionaMensagem) {
  return supabaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive) => {
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}

