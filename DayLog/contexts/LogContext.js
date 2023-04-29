import React from 'react';
import {createContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const LogContext = createContext();

export function LogContextProvider({children}) {
  const [logs, setLogos] = useState(
    Array.from({length: 10})
      .map((_, index) => ({
        id: uuidv4(),
        title: `Log ${index}`,
        body: `Log ${index}`,
        date: new Date().toISOString(),
      }))
      .reverse(),
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
  );

  const onCreate = ({title, body, date}) => {
    const log = {
      id: uuidv4(),
      title,
      body,
      date,
    };
    setLogos([log, ...logs]);
  };

  return (
    <LogContext.Provider value={{logs, onCreate}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
