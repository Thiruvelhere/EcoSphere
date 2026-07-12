import React from 'react';

export interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  // QueryProvider structure placeholder for @tanstack/react-query setup later
  return <div className="query-provider-wrapper contents">{children}</div>;
};
