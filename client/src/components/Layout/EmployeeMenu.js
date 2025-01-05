import React from 'react';
import { NavLink } from 'react-router-dom';
//zimport './EmployeeMenu.css'; // Import CSS file for styling

const EmployeeMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group">
      <div className="text-center">
          <div className="list-group">
              <div className="col-lg-4">
                  <div className="ltn__tab-menu-list mb-90">
                      <div className="nav">
                      
                      <NavLink to="/dashboard/employee/profile">
                          Profile <i className="fas fa-file-alt"></i>
                      </NavLink>
                      
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </div>
    </div>
  );
};

export default EmployeeMenu;
