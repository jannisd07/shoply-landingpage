'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import EmailPopup from '@/components/ui/EmailPopup';

interface EmailPopupContextType {
  openPopup: () => void;
  closePopup: () => void;
}

const EmailPopupContext = createContext<EmailPopupContextType | undefined>(undefined);

export function EmailPopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <EmailPopupContext.Provider value={{ openPopup, closePopup }}>
      {children}
      <EmailPopup isOpen={isOpen} onClose={closePopup} />
    </EmailPopupContext.Provider>
  );
}

export function useEmailPopup() {
  const context = useContext(EmailPopupContext);
  if (context === undefined) {
    throw new Error('useEmailPopup must be used within an EmailPopupProvider');
  }
  return context;
}
