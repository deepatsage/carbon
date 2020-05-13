import React, { useCallback, useState } from 'react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import Drawer from './drawer.component';
import { StyledDrawerSidebar, StyledDrawerChildren, StyledDrawerContent } from './drawer.style';
import {
  FlatTable, FlatTableHead, FlatTableRow, FlatTableHeader, FlatTableBody, FlatTableCell, Sort
} from '../flat-table';
import Search from '../../__experimental__/components/search';
import Button from '../button';
import PopoverContainer from '../popover-container';
import DialogFullScreen from '../dialog-full-screen';

export const SideviewNavigation = () => {
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
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortType, setSortType] = useState('desc');
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
    align-items: center;
  `;
  const createBodyData = (type) => {
    const data = bodyDataItems;
    const sortedData = data.sort((a, b) => {
      if (type === 'asc') {
        if (a.user.name < b.user.name) {
          return -1;
        }

        if (a.user.name > b.user.name) {
          return 1;
        }

        return 0;
      }

      if (type === 'desc') {
        if (a.user.name > b.user.name) {
          return -1;
        }
        if (a.user.name > b.user.name) {
          return 1;
        }

        return 0;
      }

      return sortedData;
    });

    return sortedData.map(dataItem => (
      <FlatTableRow key={ dataItem.user.name }>
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
      </FlatTableRow>
    ));
  };
  const StyledWrapper = styled('div')`
    background: red;
  `;
  const handleSortChange = () => {
    if (sortType === 'asc') {
      return setSortType('desc');
    }

    return setSortType('asc');
  };
  return (
    <StyledWrapper>
      <Drawer
        expandedWidth='50%'
        animationDuration='1500ms'
        expanded={ isExpanded }
        onChange={ onChangeHandler }
        sidebar={ (
          <div>
            dupa
            {/* <NavigationContainer>
              <Search value='' placeholder='Search' />
              <PopoverContainer
                title='Filter'
                renderOpenComponent={
                  () => {
                    return (
                      <Button
                        buttonType={ isFilterOpen ? 'primary' : 'tertiary' }
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
                  <FlatTableHeader key='user'>
                    <Sort sortType={ sortType } onClick={ handleSortChange }>User</Sort>
                  </FlatTableHeader>
                  <FlatTableHeader key='roles'>
                    Roles
                  </FlatTableHeader>
                </FlatTableRow>
              </FlatTableHead>
              <FlatTableBody>
                {createBodyData(sortType)}
              </FlatTableBody>
            </FlatTable> */}
          </div>
        ) }
      >
        content body content body content body content body content body content body content body
      </Drawer>
      <DialogFullScreen
        onCancel={ () => setIsDialogOpen(false) }
        open={ isDialogOpen }
      >
        Content of DialogFullScreen
      </DialogFullScreen>
    </StyledWrapper>
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
