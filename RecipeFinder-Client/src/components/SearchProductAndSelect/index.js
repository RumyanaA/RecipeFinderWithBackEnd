import { React, useCallback, useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import debounce from 'lodash.debounce';
import Input from '../Input';
import NoDataFoundMsg from '../ErrorMessage';
import { fetchProducts } from '../../services/recipeService';

function SearchProductAndSelect({ onProductSelect, title }) {
  const [displayValue, setDisplayValue] = useState(title);

  const [isLoading, setIsLoading] = useState(false);

  const [toggleDropDown, setToggleDropdown] = useState(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!title) {
      setDisplayValue(title);
    }
  }, [title]);

  const getProducts = (value) => {
    fetchProducts({ keyword: value })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((res) => setProducts(res))
      .finally(() => setIsLoading(false));
  };

  const handleSearch = useCallback(
    debounce((value) => {
      getProducts(value);
    }, 1000),
    [toggleDropDown],
  );

  const handleChange = (event) => {
    const { value } = event.target;
    setDisplayValue(value);
    if (!value) {
      setToggleDropdown(false);
      return;
    }
    if (!toggleDropDown) {
      setToggleDropdown(true);
    }
    setIsLoading(true);
    handleSearch(value);
  };

  const handleSelectOption = (value) => {
    const productInfo = {
      title: value.title,
      image: value.image,
    };
    setDisplayValue(value.title);
    onProductSelect(productInfo);
    setToggleDropdown(false);
  };

  return (
    <>
      <Input
        placeholder="Search product"
        onChange={handleChange}
        value={displayValue}
      />
      <div>
        {toggleDropDown && (
          <div className="dropdown-content">
            {isLoading ? (
              <div className="spinner">
                <Spinner animation="grow" variant="primary" />
              </div>
            ) : (
              <div>
                {products?.length
                  ? products?.map((product) => (
                    <option
                      className="dropdown-option"
                      onClick={() => handleSelectOption(product)}
                      key={product.id}
                      value={product.title}
                    >
                      {product.title}
                    </option>
                  ))
                  : <NoDataFoundMsg message="No Products Found" />}

              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default SearchProductAndSelect;
