
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/data/categories';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/categories/${category.id}`}
      className="group block relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-200"
    >
      <div className="h-56 bg-gray-200">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-white text-xl font-semibold mb-1">{category.name}</h3>
        <p className="text-gray-200 text-sm">{category.description}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
