import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { SEARCH } from "@/graphql/landingPage";
import { useLazyQuery } from "@apollo/client";
import { SearchQuery } from "@/__generated__/graphql";
import { useRouter } from "next/router";

interface Product {
  slug: string;
  productVariantName: string;
}

const Search = () => {
  const router = useRouter();
  const [searchProducts] = useLazyQuery(SEARCH);
  const [options, setOptions] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");

  const onSearchCompleted = (data: SearchQuery) => {
    setOptions(data.search.items);
  };

  return (
    <div className="m-3 w-full max-w-lg">
      <Autocomplete
        id="search"
        size="small"
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#023047",
            },
        }}
        getOptionLabel={(option) => option.productVariantName}
        filterOptions={(x) => x}
        options={options}
        noOptionsText={searchText ? "Product not found." : "Type to search..."}
        onChange={(_event: any, product: Product | null) => {
          router.push(
            `/product-details?name=${product?.slug}&variant=${product?.productVariantName}`
          );
        }}
        onInputChange={(_event, newInputValue) => {
          setSearchText(newInputValue);
          newInputValue
            ? searchProducts({
                variables: { input: { term: newInputValue } },
                onCompleted: onSearchCompleted,
              })
            : setOptions([]);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            placeholder="Search Products"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <SearchIcon color="action" />
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default Search;
