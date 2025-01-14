import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import FilterNav from "./components/FilterNav";
import { IFilterNavProps } from "./components/IFilterNavProps";

export interface IFilterNavWebPartProps {
  filterNames: string;
}

export default class FilterNavWebPart extends BaseClientSideWebPart<IFilterNavWebPartProps> {
  public render(): void {
    if (!this.properties.filterNames) return;
    const element: React.ReactElement<IFilterNavProps> = React.createElement(
      FilterNav,
      {
        filterNames: this.properties.filterNames.split(","),
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Filter Navbar Container",
          },
          groups: [
            {
              groupName: "Filters",
              groupFields: [
                PropertyPaneTextField("filterNames", {
                  label: "Comma separated list of filters",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}