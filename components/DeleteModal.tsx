import React from 'react';
import Accordion from "@/components/Accordion";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/24/outline";
import CheckboxCustom from "@/components/Checkbox";
import Link from "next/link";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (itemId: string) => void;
  itemId: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete,itemId }) => {

  return (
    <>
    
            
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="modal w-3/4 max-w-screen-md z-0">
        <div className="modal-background z-10" onClick={onClose} />
        <div className="modal-content">
            
          
        <div className="bg-[#FBFBFF] border rounded-2xl p-3 md:p-5 lg:py-8 lg:px-10 mb-6">
                <Accordion
                  buttonContent={(open) => (
                    <div className="rounded-2xl flex justify-between items-center">
                      <h3 className="h3">Delete Your Listing </h3>
                      
                    </div>
                  )}
                  initialOpen={true}>
                  <div className="pt-4 lg:pt-6">
                    <p className="clr-neutral-500 mb-4">
                    When you remove this tour listing, it will no longer be available for bookings,
                    <br/> and we will permanently remove its information from our records.
                    <br/> Please note that this action is irreversible.
                    </p>
                    <div className="mb-8">
                      <CheckboxCustom label="Confirm that I want to delete my tour." />
                    </div>
                    <button
                      onClick={() => onDelete(itemId)}
                      className="btn-outline mr-4 bg-[var(--tertiary)] border-[var(--tertiary)] text-[var(--neutral-700)] hover:bg-[var(--tertiary)] hover:text-neutral-700 font-semibold">
                      Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="btn-outline text-primary font-semibold">
                        Cancel
                    </button>
                  </div>
                </Accordion>
              </div>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default DeleteModal

