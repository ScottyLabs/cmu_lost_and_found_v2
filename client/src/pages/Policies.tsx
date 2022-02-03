import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Rail } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import DropdownMenu from "../components/DropdownMenu";
import LogoutButton from "../components/LogoutButton";
import { User } from "../interface/user";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";

function Policies() {
    document.title = "CMU Lost and Found";

    const [user, setUser] = useState<User | null>(null);

    const getCurrentUser = () => {
        axios.post('/api/accounts/currentUser', {
          token: window.localStorage.getItem("lnf_token")
        }).then(
          (res) => {
            if (res.data) {
              setUser(res.data);
            } else {
              setUser({ username: "user", permissions: [], notif: false });
            }
          }
        )
      };
    
    const history = useHistory();
    useEffect(() => {
      if (localStorage.getItem("lnf_token") == null) {
          console.log("not logged in");
          history.push("/login");
          return;
      }
      getCurrentUser();
    }, []);

    const isAllAdmin = user?.permissions.includes(`${BuildingType.ALL}:${PermissionType.ADMIN}`) ?? false;

    return user && (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <main>
            <Link to="/">
              <img src="/dog-logo.png" id="logo-mobile" alt="CMU Lost and Found Logo"></img>
            </Link>
            <div id="settings">
              <Rail attached internal position="left" id="logo-desktop">
                <Link to="/">
                  <img src="/dog-logo.png" alt="CMU Lost and Found Logo"></img>
                </Link>
              </Rail>
              <LogoutButton />
              <DropdownMenu page={"/policies"} isAdmin={user.permissions?.length > 0} isAllAdmin={isAllAdmin}/>
            </div>
            <h1 className="title">Carnegie Mellon University</h1>
            <h2 className="subtitle">Lost and Found - Cohon University Center Policies</h2>
            <div id="about">
              <div id="description">
                <h2> General </h2>
                <p>
                  All Carnegie Mellon students, faculty, staff, and guests, are responsible for the security of their
                  property; Carnegie Mellon accepts no responsibility for lost or stolen items while on Carnegie
                  Mellon's on campus property, non-campus property, and adjacent public property, including all
                  recognized Carnegie Mellon events.
                </p>
                <p>
                  When made known through designated “lost and found” locations, Carnegie Mellon University
                  will make a reasonable effort to return lost/abandoned property to its owner.
                </p>
                <p>
                  Carnegie Mellon University complies with all applicable laws pertaining to lost/abandoned
                  property.
                </p>

                <h2> Item Categorization </h2>
                Carnegie Mellon University categorizes lost/abandoned property as follows:
                <ul>
                    <li> Identifiable Property &mdash; Any item(s) that is believed to belong to a specific and identifiable individual </li>
                    <li> Unidentifiable Property &mdash; Any item(s) with no ability to associate to a specific and identifiable individual </li>
                    <li> High-Value Items &mdash; Any cash and jewelry with an estimated value over $50. Additionally, any electronic item with an estimated value over $500 </li>
                    <li> General Items &mdash; Any item not considered a “High-Value” item, that still maintains some level of monetary value </li>
                </ul>
                
                <h2> Procedures </h2>
                Procedures for Lost/Abandoned Property*:
                <ul>
                  <li> 
                    High Value Items 
                    <ul>
                      <li>
                        Identifiable and unidentifiable property will be turned over to the Carnegie
                        Mellon University Police Department (CMUPD) once received. High value items
                        will not be listed on CMU's public “lost and found” website.
                      </li>
                      <li>
                        If identifiable, the owner will be contacted and the property will be held by
                        CMUPD for a period of 3 years before being turned over to the Pennsylvania
                        State Treasurer.
                      </li>
                      <li>
                        If not identifiable, the property will be held by CMUPD for a period of 1 year
                        before being turned over to the Pennsylvania State Treasurer.
                      </li>
                    </ul>
                  </li>
                  <li> 
                    General Items 
                    <ul>
                      <li>
                        Identifiable property will be held at the Cohon University Center Information
                        Desk. The owner will be notified and the property will be held for a minimum of
                        90 days.
                      </li>
                      <li>
                        Unidentifiable property will be documented via a public “lost and found” website,
                        and the property will be held for a minimum of 90 days.
                      </li>
                      <li>
                        If unclaimed, all property may be donated, given away, and/or discarded.
                      </li>
                    </ul>
                  </li>
                  <li> 
                    Returning Property           
                    <ul>
                      <li>
                        Anyone claiming property must present a CMU or government issued ID to verify
                        identity, which will be recorded.
                      </li>
                      <li>
                        Anyone claiming property may be asked to take further steps to verify their
                        ownership.
                      </li>
                    </ul>
                  </li>
                </ul>
                *Water bottles and any such items which may carry bodily fluids will not be accepted.
              </div>
            </div>
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
export default Policies;
    