import { useState } from 'react';

export function useExternalLinkDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [pendingType, setPendingType] = useState<'code' | 'demo' | null>(null);

  const handleLinkClick = (url: string, type: 'code' | 'demo') => {
    setPendingUrl(url);
    setPendingType(type);
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    if (pendingUrl) {
      window.open(pendingUrl, '_blank', 'noopener,noreferrer');
    }
    setDialogOpen(false);
    setPendingUrl(null);
    setPendingType(null);
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setPendingUrl(null);
    setPendingType(null);
  };

  return {
    dialogOpen,
    setDialogOpen,
    pendingType,
    setPendingType,
    pendingUrl,
    setPendingUrl,
    handleLinkClick,
    handleConfirm,
    handleCancel,
  };

}