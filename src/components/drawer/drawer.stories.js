import React, { useCallback, useState } from 'react';
import { action } from '@storybook/addon-actions';
import Drawer from './drawer.component';
import {
  FlatTable, FlatTableHead, FlatTableRow, FlatTableHeader, Sort, FlatTableBody
} from '../flat-table';
import Search from '../../__experimental__/components/search';
import Button from '../button';

export const SideviewNavigation = () => {
  const headDataItems = [
    { name: 'User', isActive: false },
    { name: 'Roles', isActive: false },
    { name: 'Status', isActive: false }
  ];

  const bodyDataItems = [
    { user: 'Alfred Riscow', roles: ['Finance Manager', 'Payslips Admin', 'Relationship Manager'] },
    { user: 'Ben Wayne', roles: ['Full Access', 'User Admin'] },
    { user: 'Craig Hindlewood', roles: ['Sales Invoice Clerk', 'Purchase Invoice Clerk', 'Sales', 'Invoice Clerk'] },
    { user: 'David Jones', roles: ['Sales Invoice Clerk'] },
    { user: 'Edward Nestle', roles: ['Finance Clerk'] },
    { user: 'Frank Smith', roles: ['Purchase Invoice Cler'] }
  ];

  const [isExpanded, setIsExpanded] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const onChangeHandler = useCallback(() => {
    setIsExpanded(!isExpanded);
    action('expansionToggled');
  }, [isExpanded]);
  const handleSearchOnChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <Drawer
      expandedWidth='50%'
      animationDuration='0.5s'
      expanded={ isExpanded }
      onChange={ onChangeHandler }
      sidebar={ (
        <div>
          <Search value={ searchValue } onChange={ handleSearchOnChange } />
          <Button>Add User</Button>
          <FlatTable>
            <FlatTableHead>
              <FlatTableRow>
                {
                  headDataItems.map((dataItem) => {
                    return (
                      <FlatTableHeader key={ dataItem.name }>
                        <Sort>
                          {dataItem.name}
                        </Sort>
                      </FlatTableHeader>
                    );
                  })
                }
              </FlatTableRow>
            </FlatTableHead>
            {/* <FlatTableBody>
              {renderSortedData(sortValue)}
            </FlatTableBody> */}
          </FlatTable>
        </div>
      ) }
    >
      content body content body content body content body content body content body content body
    </Drawer>
  );
};

export default {
  title: 'Drawer',
  component: Drawer,
  parameters: {
    info: {
      disable: true
    },
    docs: {
      disable: true
    }
  }
};
