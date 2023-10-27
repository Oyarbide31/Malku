import { useState } from 'react';
import { SelectCategory } from '../../models/post';
import { Posts } from '../Posts/posts';

export default function PagHome() {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectCategory>('todas');

  return (
    <>
      <div>
        <h1>
          <span data-testid="selector-label">
            ¿Qué tipo de escalada quieres ver?{' '}
            {selectedCategory.toLocaleUpperCase()}
          </span>
        </h1>
        <div>
          <select
            name="choseClimb"
            id="choseClimb-select"
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(event.currentTarget.value as SelectCategory)
            }
          >
            <option value="indoor">Indoor</option>
            <option value="exterior">Exterior</option>
            <option value="todas">Todas</option>
          </select>
        </div>
      </div>
      <Posts category={selectedCategory} />
    </>
  );
}
