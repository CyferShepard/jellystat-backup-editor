// src/components/ItemList.tsx
import React, { useState } from 'react';
import './ItemList.css'; // Import the CSS file

interface Item {
  [key: string]: string;
}

interface ItemListProps {
  items: Item[];
}

interface Tables {
  [key: string]: string;
}


const tables :Tables={
  "jf_libraries":"Libraries",
  "jf_library_items":"Library Item Data",
  "jf_library_seasons":"Season Data",
  "jf_library_episodes":"Episode Data",
  "jf_users":"User Data",
  "jf_playback_activity":"Playback Activity Data",
  "jf_playback_reporting_plugin_data":"Playback Plugin Data",
  "jf_item_info":"Item Metadata",
};

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const toggleItemSelection = (item: Item) => {
    const isSelected = selectedItems.some(
      (selectedItem) => JSON.stringify(selectedItem) === JSON.stringify(item)
    );

    if (isSelected) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter(
          (selectedItem) => JSON.stringify(selectedItem) !== JSON.stringify(item)
        )
      );
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    }
  };

  const handleExportSelected = () => {
    const formattedItems = selectedItems.map((item) => ({ [Object.keys(item)[0]]: item[Object.keys(item)[0]] }));
    const jsonString = JSON.stringify(formattedItems, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedItems.some(
                  (selectedItem) => JSON.stringify(selectedItem) === JSON.stringify(item)
                )}
                onChange={() => toggleItemSelection(item)}
              />
              {tables[Object.keys(item)[0]] || "Unmapped Table"}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleExportSelected} disabled={selectedItems.length === 0}>
        Export Selected
      </button>
    </div>
  );
};

export default ItemList;
