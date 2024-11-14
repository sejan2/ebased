import { Fragment } from "react";
import { filterOptions } from "@/config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";


function ProductFilter({ filters, handleFilter }) {
    return (
        <div className="p-4 border-b rounded-lg shadow-sm bg-background md:sticky md:top-4">
            <h2 className="mb-4 text-lg font-extrabold">Filters</h2>
            {Object.keys(filterOptions).map((keyItem) => (
                <Fragment key={keyItem}>
                    <div>
                        <h3 className="text-base font-bold">{keyItem}</h3>
                        <div className="grid gap-2 mt-2">
                            {filterOptions[keyItem].map((option) => (
                                <Label key={option.id} className="flex items-center gap-2 font-medium">
                                    <Checkbox
                                        checked={
                                            filters &&
                                            Object.keys(filters).length > 0 &&
                                            filters[keyItem] &&
                                            filters[keyItem].indexOf(option.id) > -1
                                        }
                                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                                    />
                                    {option.label}
                                </Label>
                            ))}
                        </div>
                    </div>
                    <Separator className="my-4" />
                </Fragment>
            ))}
        </div>
    );
}


export default ProductFilter;