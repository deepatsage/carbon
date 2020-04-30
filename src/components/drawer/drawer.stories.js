import React, { useCallback, useState } from 'react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import Drawer from './drawer.component';
import {
  FlatTable, FlatTableHead, FlatTableRow, FlatTableHeader, Sort, FlatTableBody, FlatTableCell
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
    {
      user: {
        name: 'Robert Brass',
        contact: 'robert@brass.com'
      },
      roles: ['Finance Manager', 'Payslips Admin', 'Relationship Manager']
    },
    {
      user: {
        name: 'Stephen Allen',
        contact: 'stephen@allen.com'
      },
      roles: ['Full Access', 'User Admin']
    },
    {
      user: {
        name: 'Julie Andrews',
        contact: 'julie@andrews.com'
      },
      roles: ['Sales Invoice Clerk', 'Purchase Invoice Clerk', 'Sales', 'Invoice Clerk']
    },
    {
      user: {
        name: 'Andrew Antoniou',
        contact: 'andrew@antoniou.com'
      },
      roles: ['Sales Invoice Clerk']
    },
    {
      user: {
        name: 'Penny Bignell',
        contact: 'penny@bignell.com'
      },
      roles: ['Finance Clerk']
    },
    {
      user: {
        name: 'Christine Bingham',
        contact: 'christine@bingham.com'
      },
      roles: ['Purchase Invoice Cler']
    }
  ];

  const [isExpanded, setIsExpanded] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const onChangeHandler = useCallback(() => {
    setIsExpanded(!isExpanded);
    action('expansionToggled');
  }, [isExpanded]);
  const NavigationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    margin-bottom: 50px;
  `;

  return (
    <Drawer
      expandedWidth='50%'
      animationDuration='0.5s'
      expanded={ isExpanded }
      onChange={ onChangeHandler }
      sidebar={ (
        <div>
          <NavigationContainer>
            <Search value='' />
            <Button buttonType='primary'>Add User</Button>
          </NavigationContainer>
          <FlatTable colorTheme='transparent-white'>
            <FlatTableHead>
              <FlatTableRow>
                {
                  headDataItems.map((dataItem, index) => {
                    return (
                      <FlatTableHeader align={ index === 2 ? 'right' : 'left' } key={ dataItem.name }>
                        <Sort>
                          {dataItem.name}
                        </Sort>
                      </FlatTableHeader>
                    );
                  })
                }
              </FlatTableRow>
            </FlatTableHead>
            <FlatTableBody>
              {bodyDataItems.map(dataItem => (
                <FlatTableRow key={ dataItem.user }>
                  <FlatTableCell>
                    <div>
                      {dataItem.user.name}
                    </div>
                    <div>
                      {dataItem.user.contact}
                    </div>
                  </FlatTableCell>
                  <FlatTableCell>{dataItem.roles.map(role => (
                    <div>
                      {`${role}, `}
                    </div>
                  ))}
                  </FlatTableCell>
                  <FlatTableCell />
                </FlatTableRow>
              ))}
            </FlatTableBody>
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
