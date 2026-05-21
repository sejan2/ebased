import { filterOptions } from "@/config";
import { Fragment, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { SlidersHorizontal, ChevronDown, ChevronUp, X } from "lucide-react";

function ProductFilter({ filters, handleFilter }) {
  const [collapsed, setCollapsed] = useState({});

  function toggleSection(key) {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const totalActive = Object.values(filters || {}).reduce(
    (sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0
  );

  function clearAll() {
    Object.keys(filterOptions).forEach((keyItem) => {
      (filterOptions[keyItem] || []).forEach((option) => {
        if (filters?.[keyItem]?.includes(option.id)) {
          handleFilter(keyItem, option.id);
        }
      });
    });
  }

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden h-fit sticky top-20">
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <h2 className="font-bold text-gray-800">Filters</h2>
          {totalActive > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              {totalActive}
            </span>
          )}
        </div>
        {totalActive > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium transition"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="divide-y">
        {Object.keys(filterOptions).map((keyItem) => {
          const isCollapsed = collapsed[keyItem];
          const activeCount = filters?.[keyItem]?.length || 0;

          return (
            <div key={keyItem} className="px-4 py-3">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(keyItem)}
                className="w-full flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700 capitalize">{keyItem}</span>
                  {activeCount > 0 && (
                    <span className="bg-primary/10 text-primary text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {activeCount}
                    </span>
                  )}
                </div>
                {isCollapsed
                  ? <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  : <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                }
              </button>

              {/* Options */}
              {!isCollapsed && (
                <div className="mt-3 space-y-2">
                  {filterOptions[keyItem].map((option) => {
                    const isChecked =
                      filters &&
                      Object.keys(filters).length > 0 &&
                      filters[keyItem] &&
                      filters[keyItem].indexOf(option.id) > -1;

                    return (
                      <Label
                        key={option.id}
                        className={`flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${
                          isChecked ? "bg-primary/8 text-primary" : "hover:bg-gray-50 text-gray-600"
                        }`}
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => handleFilter(keyItem, option.id)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <span className={`text-sm font-medium ${isChecked ? "text-primary" : ""}`}>
                          {option.label}
                        </span>
                        {isChecked && (
                          <span className="ml-auto w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        )}
                      </Label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductFilter;
