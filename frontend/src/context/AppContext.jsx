import React, { createContext, useState } from "react";

// Contextの作成
export const AppContext = createContext();

//プロバイダーの作成
export const AppProvider = ( {children }) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [blogKeywords, setBlogKeywords] = useState('');
    
    return (
        <AppContext.Provider
            value={{
                searchKeyword,
                setSearchKeyword,
                blogKeywords,
                setBlogKeywords
            }}
        >
                {children}
        </AppContext.Provider>
    );
};