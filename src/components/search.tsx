import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { SEARCH } from "@/graphql/landingPage";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [term, setTerm] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setTerm(searchText.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [searchText]);

  const { data, loading, error } = useQuery(SEARCH, {
    variables: { input: { term } },
    skip: !term,
  });
  const waiting = term !== searchText.trim();
  const options = term && !waiting && !error ? data?.search.items ?? [] : [];

  return (
    <div className="zeal-search">
      <Autocomplete
        id="search"
        size="small"
        inputValue={searchText}
        options={options}
        loading={!!searchText.trim() && (waiting || loading)}
        filterOptions={(items) => items}
        getOptionLabel={(product) => product.productVariantName}
        isOptionEqualToValue={(first, second) =>
          first.slug === second.slug &&
          first.productVariantName === second.productVariantName
        }
        noOptionsText={
          error && term && !waiting
            ? "Search is temporarily unavailable."
            : searchText.trim()
            ? "No matching products."
            : "Type to search."
        }
        onChange={(_event, product) => {
          if (!product) return;
          void router.push({
            pathname: "/product-details",
            query: { name: product.slug, variant: product.productVariantName },
          });
        }}
        onInputChange={(_event, value) => setSearchText(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            placeholder="Search products"
            inputProps={{
              ...params.inputProps,
              "aria-label": "Search products",
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: <SearchIcon color="action" fontSize="small" />,
            }}
          />
        )}
      />
    </div>
  );
}
