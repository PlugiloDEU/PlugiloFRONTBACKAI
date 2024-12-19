import React, { useState } from 'react';

export const CorporateMenu = () => {
  const [activeOption, setActiveOption] = useState<number | null>(null);

  const toggleSubMenu = (index: number) => {
    setActiveOption(activeOption === index ? null : index);
  };

  const submenuItems = ['Submenu Item 1', 'Submenu Item 2', 'Submenu Item 3'];

  return (
    <div className="bg-black text-green-500 p-4 rounded shadow-lg">
      <ul className="flex space-x-4">
        {['Add Company', 'Add Person', 'CRM', 'Office Tools', 'HR Tools', 'AI Tools', 'Master Database', 'Contact Plugilo'].map((option, index) => (
          <li key={index} className="relative">
            <button
              onClick={() => toggleSubMenu(index)}
              className="hover:bg-green-500/10 transition-colors p-2 rounded"
            >
              {option}
            </button>
            {activeOption === index && (
              <div className="absolute left-0 mt-2 bg-black/50 text-white p-2 rounded shadow-lg">
                <ul className="space-y-2">
                  {submenuItems.map((item, subIndex) => (
                    <li key={subIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
