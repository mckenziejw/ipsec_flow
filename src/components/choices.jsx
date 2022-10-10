import React, { Component } from "react";
import Choice from "./choice";
import advpn_diagram from "../diagrams/advpn_diagram.svg";
import dynamic_hub_and_spoke_diagram from "../diagrams/dynamic_hub_and_spoke_diagram.svg";
import remote_vpn_diagram from "../diagrams/remote_vpn_diagram.svg";
import site_to_site_diagram from "../diagrams/site_to_site_diagram.svg";
import static_hub_and_spoke_diagram from "../diagrams/hub_and_spoke_diagram.svg";
import multisite_vpn_diagram from "../diagrams/multisite_vpn_diagram.svg";
import hub_and_spoke_diagram from "../diagrams/hub_and_spoke_diagram.svg";

class Choices extends Component {
  state = {
    active_branch: "root",
  };

  decision_tree = {
    root: {
      text: "Which option best describes your situation?",
      prompt_text: "Which option best describes your situation?",
      diagram: remote_vpn_diagram,
      children: ["remote_vpn", "site_to_site_vpn", "multisite_vpn"],
    },
    remote_vpn: {
      text: "We recommend you implement a Remote Access VPN",
      title: "Remote Access",
      prompt_text: "I need to secure remote user access to internal resources",
      diagram: remote_vpn_diagram,
      links: [
        {
          text: "Remote Access VPNs with NCP Exclusive Remote Access Client",
          url: "https://www.juniper.net/documentation/us/en/software/junos/vpn-ipsec/topics/topic-map/security-remote-access-vpns-with-ncp-exclusive-remote-access-client.html",
        },
        {
          text: "Dynamic VPNs with Pulse Secure Clients",
          url: "https://www.juniper.net/documentation/us/en/software/junos/vpn-ipsec/topics/topic-map/security-dynamic-vpns-with-pulse-secure-clients.html",
        },
        {
          text: "Juniper Secure Connect",
          url: "https://www.juniper.net/documentation/us/en/software/junos/vpn-ipsec/topics/concept/juniper-secure-connect-overview.html",
        },
      ],
    },
    site_to_site_vpn: {
      text: "We recommend you configure a site-to-site VPN",
      title: "Site-to-Site",
      prompt_text: "I need to secure traffic between two sites",
      diagram: site_to_site_diagram,
      links: [
        {
          text: "Policy-Based IPsec VPNs",
          url: "https://www.juniper.net/documentation/us/en/software/junos/vpn-ipsec/topics/topic-map/security-policy-based-ipsec-vpns.html",
        },
        {
          text: "Route-Based IPsec VPNs",
          url: "https://www.juniper.net/documentation/us/en/software/junos/vpn-ipsec/topics/topic-map/security-route-based-ipsec-vpns.html",
        },
        {
          text: "CoS-Based IPsec VPNs",
          url: "https://www.juniper.net/documentation/us/en/software/junos/vpn-ipsec/topics/topic-map/security-cos-based-ipsec-vpns.html",
        },
      ],
    },
    multisite_vpn: {
      text: "Which of the following best describes your situation?",
      prompt_text: "I need to secure traffic between multiple sites",
      title: "Multisite",
      diagram: multisite_vpn_diagram,
      children: ["hub_and_spoke", "advpn"],
    },
    hub_and_spoke: {
      text: "Which of the following best describes your situation?",
      title: "Hub-and-Spoke",
      diagram: static_hub_and_spoke_diagram,
      prompt_text:
        "I have a single hub site through which intersite traffic should be routed",
      children: ["dynamic_hub_and_spoke", "static_hub_and_spoke"],
    },
    advpn: {
      text: "We recommend you deploy ADVPN",
      title: "ADVPN",
      prompt_text: "I need to secure direct site-to-site communication",
      diagram: advpn_diagram,
      links: [
        {
          text: "ADVPN configuration",
          url: "",
        },
      ],
    },
    dynamic_hub_and_spoke: {
      text: "We recommend you deploy a dynamic hub-and-spoke solution.",
      title: "Dynamic Hub-and-Spoke",
      prompt_text: "I need to be able to easily add and remove sites",
      diagram: dynamic_hub_and_spoke_diagram,
      links: [
        {
          text: "Group VPN",
          url: "",
        },
        {
          text: "AutoVPN",
          url: "",
        },
      ],
    },
    static_hub_and_spoke: {
      text: "We recommend you configure a standard hub-and-spoke IPsec VPN",
      title: "Standard Hub-and-Spoke",
      prompt_text:
        "My topology is fixed and I do not need to rapidly add or remove sites",
      diagram: hub_and_spoke_diagram,
      links: [
        {
          text: "Hub-and-Spoke Route-Based VPNs",
          url: "",
        },
      ],
    },
  };

  generateChoices = () => {
    let active_branch = this.state.active_branch;
    // Determine if there are children
    if (this.decision_tree[this.state.active_branch].children) {
      // Generate a card for each child
      return (
        <React.Fragment>
          {this.decision_tree[this.state.active_branch].children.map(
            (choice_item) => (
              <Choice
                key={choice_item}
                id={choice_item}
                title={this.decision_tree[choice_item].title}
                diagram={this.decision_tree[choice_item].diagram}
                text={this.decision_tree[choice_item].prompt_text}
                choiceClick={this.handleChoiceClick}
              />
            )
          )}
        </React.Fragment>
      );
    } else {
      // generate a summary card
      return (
        <React.Fragment>
          <Choice
            key={active_branch}
            id={active_branch}
            title={this.decision_tree[active_branch].title}
            diagram={this.decision_tree[active_branch].diagram}
            text={this.decision_tree[active_branch].text}
            links={this.decision_tree[active_branch].links}
            choiceClick={this.handleChoiceClick}
          />
        </React.Fragment>
      );
    }
  };

  handleChoiceClick = (key_val) => {
    this.setState({
      active_branch: key_val,
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1
          className="display1"
          style={{
            padding: "20px",
          }}
        >
          Which IPsec VPN is right for you?
        </h1>
        <div
          className="row"
          style={{
            background: "#e5f5f1",
          }}
        >
          {this.generateChoices()}
        </div>
      </React.Fragment>
    );
  }
}

export default Choices;
