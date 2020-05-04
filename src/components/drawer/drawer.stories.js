import React, { useCallback, useState } from 'react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import Drawer from './drawer.component';
import {
  FlatTable, FlatTableHead, FlatTableRow, FlatTableHeader, Sort, FlatTableBody, FlatTableCell
} from '../flat-table';
import Search from '../../__experimental__/components/search';
import Button from '../button';
import PopoverContainer from '../popover-container';
import Icon from '../icon';
import { StyledButton } from './drawer.style';
import DialogFullScreen from '../dialog-full-screen';

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
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  const handleOpenFilterClick = () => {
    setFilterOpen(!isFilterOpen);
  };
  const onChangeHandler = useCallback(() => {
    setIsExpanded(!isExpanded);
    action('expansionToggled');
  }, [isExpanded]);
  const NavigationContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 0 24px;
    margin-bottom: 50px;
  `;

  return (
    <>
      <Drawer
        expandedWidth='50%'
        animationDuration='0.5s'
        expanded={ isExpanded }
        onChange={ onChangeHandler }
        sidebar={ (
          <div>
            <NavigationContainer>
              <Search value='' placeholder='Search' />
              <PopoverContainer
                title='Filter'
                renderOpenComponent={
                  () => {
                    return (
                      <Button
                        buttonType={ isFilterOpen ? 'secondary' : 'tertiary' }
                        onClick={ handleOpenFilterClick }
                        iconType={ isFilterOpen ? 'close' : 'filter_new' }
                        iconPosition='after'
                      >
                        Filter

                      </Button>
                    );
                  }
                }
                renderCloseComponent={ () => {} }
                open={ isFilterOpen }
              >This is example component of Popover Container
              </PopoverContainer>
              <Button
                onClick={ handleDialogOpen } style={ { marginLeft: 'auto' } }
                buttonType='primary'
              >Add User
              </Button>
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
      <DialogFullScreen onCancel={ () => setIsDialogOpen(false) } open={ isDialogOpen }>Content of DialogFullScreen</DialogFullScreen>
    </>
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
