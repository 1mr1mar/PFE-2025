import { useContext } from 'react';
import { CustomerContext } from '../App';

export const useCustomer = () => {
  const customerId = useContext(CustomerContext);
  
  if (customerId === undefined) {
    throw new Error('useCustomer must be used within a CustomerContext.Provider');
  }
  
  return customerId;
}; 