import React, { createContext, useState } from 'react';

interface AppContextProps {
  guests: number;
  location: string;
  tourID: string;
  setGuests: React.Dispatch<React.SetStateAction<number>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setTourID: React.Dispatch<React.SetStateAction<string>>;
}

const BookContext = createContext<AppContextProps | undefined>(undefined);

interface BookProviderProps {
  children?: React.ReactNode
}
export const BookProvider = ({ children }: BookProviderProps) => {
  const [guests, setGuests] = useState(1);
  const [location, setLocation] = useState("");
  const [tourID, setTourID] = useState("");

  return (
    <BookContext.Provider value={{ guests, location,tourID, setGuests, setTourID ,setLocation }}>
      {children}
    </BookContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = React.useContext(BookContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
