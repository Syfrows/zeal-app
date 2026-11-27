import { gql, type TypedDocumentNode } from "@apollo/client";
import type { GetProductsByCollectionCustomQuery, GetProductsByCollectionCustomQueryVariables } from "@/__generated__/graphql";
export type PublicFacetValue = { id: string; name: string; facet: { id: string; name: string } };
type Collection = NonNullable<GetProductsByCollectionCustomQuery["collection"]>;
type Item = Collection["productVariants"]["items"][number];
type TaggedItem = Item & { facetValues: PublicFacetValue[]; product: Item["product"] & { facetValues: PublicFacetValue[] } };
type Result = { facets: { items: { id: string }[] }; collection: { productVariants: { totalItems: number; items: TaggedItem[] } } | null };

export const PRODUCTS_BY_COLLECTION: TypedDocumentNode<Result, GetProductsByCollectionCustomQueryVariables> = gql(`#graphql
  query getProductsByCollectionCustom($id: ID, $slug: String, $options: ProductVariantListOptions) {
    facets(options: {take:100}) { items { id } }
    collection(id: $id, slug: $slug) {
      productVariants(options: $options) {
        items {
          name
          priceWithTax
          facetValues { id name facet { id name } }
          stockLevel
          customFields {
            MRP
          }
          featuredAsset {
            preview
          }
          product {
            name
            slug
            facetValues { id name facet { id name } }
            featuredAsset {
              preview
            }
            customFields {
              reviewRating
            }
          }
        }
        totalItems
      }
    }
  }
`);
