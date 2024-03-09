import type { Schema, Attribute } from '@strapi/strapi';

export interface CategoryCategory extends Schema.Component {
  collectionName: 'components_shared_categories';
  info: {
    displayName: 'collection';
    icon: 'folder-plus';
    description: '';
  };
  attributes: {
    images: Attribute.Component<'shared.photo', true>;
  };
}

export interface SharedPhoto extends Schema.Component {
  collectionName: 'components_shared_photos';
  info: {
    displayName: 'photo';
    icon: 'image';
    description: '';
  };
  attributes: {
    position: Attribute.Integer;
    title: Attribute.String;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface WorkCategoryCard extends Schema.Component {
  collectionName: 'components_shared_category_cards';
  info: {
    displayName: 'CategoryCard';
    icon: 'address-card';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    slug: Attribute.String & Attribute.Required;
    thumbnail: Attribute.Media & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'category.category': CategoryCategory;
      'shared.photo': SharedPhoto;
      'work.category-card': WorkCategoryCard;
    }
  }
}
