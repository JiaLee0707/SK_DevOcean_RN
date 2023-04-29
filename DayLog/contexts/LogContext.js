import React, {useEffect, useRef} from 'react';
import {createContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import logsStorage from '../storages/logsStorage';

const LogContext = createContext();

export function LiogContextProvider({children}) {
  const initialLogsRef = useRef(null);
  const [logs, setLogos] = useState([]);
  // Array.from({length: 10})
  //   .map((_, index) => ({
  //     id: uuidv4(),
  //     title: `Log ${index}`,
  //     body: `Log ${index}`,
  //     date: new Date().toISOString(),
  //   }))
  //   .reverse(),
  //   [
  //   {
  //     id: uuidv4(),
  //     title: 'Log 03',
  //     body: 'Log 03',
  //     date: new Date().toISOString(),
  //   },
  //   {
  //     id: uuidv4(),
  //     title: 'Log 02',
  //     body: 'Log 02',
  //     date: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
  //   },
  //   {
  //     id: uuidv4(),
  //     title: 'Log 03',
  //     body: 'Log 03',
  //     date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  //   },
  // ]
  // );

  const onCreate = ({title, body, date}) => {
    const log = {
      id: uuidv4(),
      title,
      body,
      date,
    };
    setLogos([log, ...logs]);
  };

  const onModify = modified => {
    // logs 배열을 순회해 id가 일치하면 log를 교체하고 그렇지 않으면 유지
    const nextLogs = logs.map(log => (log.id === modified.id ? modified : log));
    setLogos(nextLogs);
  };

  const onRemove = id => {
    const nextLogs = logs.filter(log => log.id !== id);
    setLogos(nextLogs);
  };

  useEffect(() => {
    // useEffect 내에서 async 함수를 만들고 바로 호출
    // IIFE 패턴
    (async () => {
      const savedLogs = await logsStorage.get();
      if (savedLogs) {
        initialLogsRef.current = savedLogs;
        setLogos(savedLogs);
      }
    })();
  }, []);

  useEffect(() => {
    if (logs === initialLogsRef.current) {
      return;
    }
    logsStorage.set(logs);
  }, [logs]);

  return (
    <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
