import React, { ReactNode, useState } from "react";
import { ICurrentActiveElement } from "../interfaces";

interface IProps {
  children: ReactNode[],
}

export const UtilsContext = React.createContext<ICurrentActiveElement.Context>({ currentActiveElement: null });

const UtilsProvider = ({ children }: IProps) => { // UtilsProvider can hold multiple values, and one of them is currentActiveElement
  const [currentActiveElement, setCurrentActiveElement] = useState<ICurrentActiveElement.CurrentActiveElement>(null);

  return <UtilsContext.Provider value={{ currentActiveElement: { value: currentActiveElement, set: setCurrentActiveElement } }}>
    {children}
  </UtilsContext.Provider>
}

export default UtilsProvider;