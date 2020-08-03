import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Menu, MenuItem } from '.';
import StyledMenuItemWrapper from './menu-item/menu-item.style';
import { StyledSubmenu } from './submenu-block/submenu.style';
import MenuDivider from './menu-divider/menu-divider.component';

describe('Menu', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Menu>
        <MenuItem>test element</MenuItem>
      </Menu>
    );
  });

  it('should render with correct `data-component`', () => {
    expect(wrapper.prop('data-component')).toEqual('menu');
  });

  it('should have light theme as primary', () => {
    expect(wrapper.props().menuType).toBe('light');
  });

  it('should render children correctly', () => {
    expect(wrapper.find(MenuItem).exists()).toBe(true);
  });

  it('should provide `menuType` to the children component', () => {
    expect(wrapper.find(MenuItem).props().menuType).toBe('light');
  });

  describe('Keyboard Navigation', () => {
    let container;
    let menuItemFirst;
    let styledMenuItemFirst;
    let menuItemSecond;
    let styledMenuItemSecond;
    let menuItemThird;
    let styledMenuItemThird;
    const KEYS = {
      arrowRight: 39,
      arrowLeft: 37,
      arrowDown: 40,
      arrowUp: 38,
      end: 35,
      home: 36,
      b: 66,
      d: 68,
      esc: 27,
      tab: 9
    };

    beforeEach(() => {
      container = document.createElement('div');
      container.id = 'enzymeContainer';
      document.body.appendChild(container);
      wrapper = mount(
        <Menu>
          <MenuItem href='#'>
            A Menu Item One
          </MenuItem>
          <MenuItem href='#'>
            B Menu Item Two
          </MenuItem>
          <MenuItem href='#'>
            B Menu Item Three
          </MenuItem>
        </Menu>,
        { attachTo: container }
      );

      menuItemFirst = wrapper.find('a').at(0);
      menuItemSecond = wrapper.find('a').at(1);
      menuItemThird = wrapper.find('a').at(2);
      styledMenuItemFirst = wrapper.find(StyledMenuItemWrapper).at(0);
      styledMenuItemSecond = wrapper.find(StyledMenuItemWrapper).at(1);
      styledMenuItemThird = wrapper.find(StyledMenuItemWrapper).at(2);
    });

    afterEach(() => {
      document.body.removeChild(container);
      container = null;
    });

    it('should move to second item if arrow right key is pressed', () => {
      menuItemFirst.getDOMNode().focus();
      expect(menuItemFirst).toBeFocused();
      styledMenuItemFirst.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowRight });
      expect(menuItemSecond).toBeFocused();
    });

    it('should move to first item if arrow left key is pressed', () => {
      menuItemSecond.getDOMNode().focus();
      expect(menuItemSecond).toBeFocused();
      styledMenuItemSecond.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowLeft });
      expect(menuItemFirst).toBeFocused();
    });

    it('should move to last item if end key is pressed', () => {
      menuItemFirst.getDOMNode().focus();
      expect(menuItemFirst).toBeFocused();
      styledMenuItemFirst.props().onKeyDown({ preventDefault: () => {}, which: KEYS.end });
      expect(menuItemThird).toBeFocused();
    });

    it('should move to first item if home key is pressed', () => {
      menuItemThird.getDOMNode().focus();
      expect(menuItemThird).toBeFocused();
      styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.home });
      expect(menuItemFirst).toBeFocused();
    });

    it('should move to last item if arrow left is pressed on first item', () => {
      menuItemFirst.getDOMNode().focus();
      expect(menuItemFirst).toBeFocused();
      styledMenuItemFirst.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowLeft });
      expect(menuItemThird).toBeFocused();
    });

    it('should move to first item if arrow right is pressed on last item', () => {
      menuItemThird.getDOMNode().focus();
      expect(menuItemThird).toBeFocused();
      styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowRight });
      expect(menuItemFirst).toBeFocused();
    });

    it('should move to first item that start with character b if b key is pressed', () => {
      menuItemFirst.getDOMNode().focus();
      expect(menuItemFirst).toBeFocused();
      styledMenuItemFirst.props().onKeyDown({
        key: 'b', preventDefault: () => {}, stopPropagation: () => {}, which: KEYS.b
      });
      expect(menuItemSecond).toBeFocused();
    });

    it('should not move if item starting with d character does not exist', () => {
      menuItemFirst.getDOMNode().focus();
      expect(menuItemFirst).toBeFocused();
      styledMenuItemFirst.props().onKeyDown({
        key: 'd', preventDefault: () => {}, stopPropagation: () => {}, which: KEYS.d
      });
      expect(menuItemFirst).toBeFocused();
    });

    it('should move to second item if first item that start with b character is already focused', () => {
      menuItemFirst.getDOMNode().focus();
      expect(menuItemFirst).toBeFocused();
      styledMenuItemFirst.props().onKeyDown({
        key: 'b', preventDefault: () => {}, stopPropagation: () => {}, which: KEYS.b
      });
      expect(menuItemSecond).toBeFocused();
      styledMenuItemSecond.props().onKeyDown({
        key: 'b', preventDefault: () => {}, stopPropagation: () => {}, which: KEYS.b
      });
      expect(menuItemThird).toBeFocused();
    });

    it('should set focus to first element that start with b character even if has submenu', () => {
      const containerWithSubmenu = document.createElement('div');
      containerWithSubmenu.id = 'containerWithSubmenu';
      document.body.appendChild(containerWithSubmenu);
      const wrapperWithSubmenu = mount(
        <Menu>
          <MenuItem href='#'>
            A Menu Item One
          </MenuItem>
          <MenuItem submenu='B Menu Item Two'>
            <MenuItem>Submenu One</MenuItem>
          </MenuItem>
          <MenuItem href='#'>
            B Menu Item Three
          </MenuItem>
        </Menu>,
        { attachTo: containerWithSubmenu }
      );

      menuItemFirst = wrapperWithSubmenu.find('a').at(0);
      menuItemSecond = wrapperWithSubmenu.find('a').at(1);
      styledMenuItemFirst = wrapperWithSubmenu.find(StyledMenuItemWrapper).at(0);

      menuItemFirst.getDOMNode().focus();
      expect(menuItemFirst).toBeFocused();
      styledMenuItemFirst.props().onKeyDown({
        key: 'b', preventDefault: () => {}, stopPropagation: () => {}, which: KEYS.b
      });
      expect(menuItemSecond).toBeFocused();
    });

    describe('With Submenu', () => {
      let submenuItemFirst;
      let submenuItemSecond;
      let submenuItemThird;

      beforeEach(() => {
        container = document.createElement('div');
        container.id = 'enzymeContainer';
        document.body.appendChild(container);
        wrapper = mount(
          <Menu>
            <MenuItem href='#'>
              A Menu Item One
            </MenuItem>
            <MenuItem href='#'>
              B Menu Item Two
            </MenuItem>
            <MenuItem submenu='B Menu Item Three'>
              <MenuItem href='#'>A Submenu Item One</MenuItem>
              <MenuItem href='#'>B Submenu Item Two</MenuItem>
              <MenuDivider />
              <MenuItem href='#'>B Submenu Item Three</MenuItem>
            </MenuItem>
          </Menu>,
          { attachTo: container }
        );

        menuItemFirst = wrapper.find('a').at(0);
        menuItemSecond = wrapper.find('a').at(1);
        menuItemThird = wrapper.find('a').at(2);
        styledMenuItemFirst = wrapper.find(StyledMenuItemWrapper).at(0);
        styledMenuItemSecond = wrapper.find(StyledMenuItemWrapper).at(1);
        styledMenuItemThird = wrapper.find(StyledMenuItemWrapper).at(3);
        submenuItemFirst = wrapper.find(StyledSubmenu).find(MenuItem).at(0).find('a');
        submenuItemSecond = wrapper.find(StyledSubmenu).find(MenuItem).at(1).find('a');
        submenuItemThird = wrapper.find(StyledSubmenu).find(MenuItem).at(2).find('a');
      });

      it('should set focus to first item after open submenu', () => {
        menuItemThird.getDOMNode().focus();
        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });
        expect(submenuItemFirst).toBeFocused();
      });

      it('should set focus to first item after open submenu with arrow down key', () => {
        menuItemThird.getDOMNode().focus();
        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });
        expect(submenuItemFirst).toBeFocused();
      });

      it('should set focus to last item after open submenu with arrow up key', () => {
        menuItemThird.getDOMNode().focus();
        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowUp });
        });
        expect(submenuItemThird).toBeFocused();
      });

      it('should set focus to second submenu item', () => {
        menuItemThird.getDOMNode().focus();
        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });
        wrapper.update();
        expect(submenuItemFirst).toBeFocused();
        act(() => {
          wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(0).props()
            .onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });
        expect(submenuItemSecond).toBeFocused();
      });

      it('should set focus to previous element if you arrow up key is pressed', () => {
        menuItemThird.getDOMNode().focus();
        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });
        wrapper.update();
        expect(submenuItemFirst).toBeFocused();
        act(() => {
          wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(0).props()
            .onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });
        expect(submenuItemSecond).toBeFocused();
        act(() => {
          wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(1).props()
            .onKeyDown({ preventDefault: () => {}, which: KEYS.arrowUp });
        });
        expect(submenuItemFirst).toBeFocused();
      });

      it('should set focus to last submenu item if end key is pressed', () => {
        menuItemThird.getDOMNode().focus();
        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });
        wrapper.update();
        expect(submenuItemFirst).toBeFocused();
        act(() => {
          wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(0).props()
            .onKeyDown({ preventDefault: () => {}, which: KEYS.end });
        });
        expect(submenuItemThird).toBeFocused();
      });

      it('should set focus to first submenu item if home key is pressed', () => {
        menuItemThird.getDOMNode().focus();
        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowUp });
        });
        wrapper.update();
        expect(submenuItemThird).toBeFocused();
        act(() => {
          wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(2).props()
            .onKeyDown({ preventDefault: () => {}, which: KEYS.home });
        });
        wrapper.update();
        expect(submenuItemFirst).toBeFocused();
      });

      it('should set focus to opening menu item if esc key is pressed', () => {
        menuItemThird.getDOMNode().focus();
        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });
        wrapper.update();
        expect(submenuItemFirst).toBeFocused();
        act(() => {
          wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(0).props()
            .onKeyDown({ preventDefault: () => {}, which: KEYS.esc });
        });
        expect(menuItemThird).toBeFocused();
      });

      it('should set focus to first matching item', () => {
        menuItemThird.getDOMNode().focus();
        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });
        expect(submenuItemFirst).toBeFocused();
        wrapper.update();
        act(() => {
          wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(0).props()
            .onKeyDown({
              key: 'b', stopPropagation: () => {}, preventDefault: () => {}, which: KEYS.b
            });
        });
        wrapper.update();
        expect(submenuItemSecond).toBeFocused();
      });

      it('should set focus to next matching item if first item is already focused', () => {
        menuItemThird.getDOMNode().focus();
        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });
        expect(submenuItemFirst).toBeFocused();
        wrapper.update();
        act(() => {
          wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(0).props()
            .onKeyDown({
              key: 'b', stopPropagation: () => {}, preventDefault: () => {}, which: KEYS.b
            });
        });
        wrapper.update();
        expect(submenuItemSecond).toBeFocused();
        act(() => {
          wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(1).props()
            .onKeyDown({
              key: 'b', stopPropagation: () => {}, preventDefault: () => {}, which: KEYS.b
            });
        });
        wrapper.update();
        expect(submenuItemThird).toBeFocused();
      });

      it('should not move focus if there is no matching elements', () => {
        menuItemThird.getDOMNode().focus();
        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });
        expect(submenuItemFirst).toBeFocused();
        wrapper.update();
        act(() => {
          wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(0).props()
            .onKeyDown({
              key: 'd', stopPropagation: () => {}, preventDefault: () => {}, which: KEYS.d
            });
        });
        wrapper.update();
        expect(submenuItemFirst).toBeFocused();
      });

      it('should skip focus if next item is <MenuDivider />', () => {
        menuItemThird.getDOMNode().focus();
        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });
        expect(submenuItemFirst).toBeFocused();
        wrapper.update();
        act(() => {
          wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(0).props()
            .onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });
        wrapper.update();
        expect(submenuItemSecond).toBeFocused();
        act(() => {
          wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(1).props()
            .onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });
        wrapper.update();
        expect(submenuItemThird).toBeFocused();
      });

      it('should skip focus if next item after pressing arrow up key is <MenuDivider />', () => {
        menuItemThird.getDOMNode().focus();
        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowUp });
        });
        expect(submenuItemThird).toBeFocused();
        wrapper.update();
        act(() => {
          wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(2).props()
            .onKeyDown({ preventDefault: () => {}, which: KEYS.arrowUp });
        });
        wrapper.update();
        expect(submenuItemSecond).toBeFocused();
      });

      it('should back to second item if arrow left key pressed', () => {
        menuItemThird.getDOMNode().focus();
        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });

        expect(submenuItemFirst).toBeFocused();
        wrapper.update();

        act(() => {
          wrapper.find(StyledMenuItemWrapper).at(2).props()
            .onKeyDown({ preventDefault: () => {}, which: KEYS.arrowLeft });
        });

        wrapper.update();

        expect(menuItemSecond).toBeFocused();
      });

      it('should set focus to first item if next item does not exist', () => {
        menuItemThird.getDOMNode().focus();
        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowUp });
        });
        expect(submenuItemThird).toBeFocused();
        wrapper.update();
        act(() => {
          wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(2).props()
            .onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });
        wrapper.update();
        expect(submenuItemFirst).toBeFocused();
      });

      it('should set focus to last item if next item does not exist after pressed arrow up key', () => {
        menuItemThird.getDOMNode().focus();
        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });
        expect(submenuItemFirst).toBeFocused();
        wrapper.update();
        act(() => {
          wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(0).props()
            .onKeyDown({ preventDefault: () => {}, which: KEYS.arrowUp });
        });
        wrapper.update();
        expect(submenuItemThird).toBeFocused();
      });

      it('should close the submenu if shift+Tab has been pressed', () => {
        menuItemThird.getDOMNode().focus();

        expect(menuItemThird).toBeFocused();
        act(() => {
          styledMenuItemThird.props().onKeyDown({ preventDefault: () => {}, which: KEYS.arrowDown });
        });

        expect(submenuItemFirst).toBeFocused();
        wrapper.update();

        expect(wrapper.find(MenuItem).at(2).find(StyledMenuItemWrapper).at(0)
          .props().isOpen).toBe(true);

        act(() => {
          wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(0).props()
            .onKeyDown({
              preventDefault: () => {}, shiftKey: true, which: KEYS.tab, key: 'TAB'
            });
        });

        wrapper.update();

        expect(wrapper.find(MenuItem).at(2).find(StyledMenuItemWrapper).at(0)
          .props().isOpen).toBe(false);
      });
    });
  });
});
