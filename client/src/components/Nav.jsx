import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon, Modal, Menu } from 'semantic-ui-react'

function Nav() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <>
    <div className='nav-wrapper'>
      <div className='nav-icon' onClick={()=> {toggleNavBtn()}}>
        <Modal trigger = {
          <Button onClick={handleOpen}><Icon name = 'bars'/></Button>
          }
          open={modalOpen}
          onClose={handleClose}
          basic
          // dimmer='inverted'
          size='small'
          closeIcon={true}
          closeOnDimmerClick={false}
          >
        <Modal.Content>
          <Menu vertical>
            <Link to="/tasks">
                <Menu.Item
                  name='Tasks'
                  onClick={handleClose}>
                  <Icon name='tasks' />
                  Tasks 
                </Menu.Item>
              </Link>
              <Link to="/calendar">
                <Menu.Item
                  name='Calendar'
                  onClick={handleClose}>
                  <Icon name='calendar alternate' />
                  Calendar
                </Menu.Item>
              </Link>
              <Link to="/reports">
                <Menu.Item
                  name='Calendar'
                  onClick={handleClose}>
                  <Icon name='file alternate outline' />
                  Reports
                </Menu.Item>
              </Link>
              <Link to="/settings">
                <Menu.Item
                  name='settings'
                  onClick={handleClose}>
                  <Icon name='cog' />
                  Settings
                </Menu.Item>
              </Link>
          </Menu>
      </Modal.Content>
      
    </Modal>
      </div>
    </div>
    </>
  )
}

export default Nav