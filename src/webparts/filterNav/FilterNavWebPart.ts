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
  flexDirection: string;
  wrap: string;
  justify: string;
  align: string;
  gap: string;
  top: string;
  width: string;
}

export default class FilterNavWebPart extends BaseClientSideWebPart<IFilterNavWebPartProps> {
  public render(): void {
    const filterNames =
      this.properties.filterNames?.split(",").map((name) => name.trim()) || [];

    const cssProps = {
      flexDirection: this.properties.flexDirection ?? "row",
      flexWrap: this.properties.wrap ?? "wrap",
      justifyContent: this.properties.justify ?? "space-evenly",
      alignItems: this.properties.align ?? "center",
      gap: this.properties.gap ?? "1rem",
      top: this.properties.top ?? "100px",
      width: this.properties.width ?? "100vw",
    };
    const element: React.ReactElement<IFilterNavProps> = React.createElement(
      FilterNav,
      {
        filterNames: filterNames,
        cssProps: { ...cssProps },
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    if (!this.properties.filterNames) {
      this.properties.filterNames = "";
    }
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
            {
              groupName: "CSS Properties",
              groupFields: [
                PropertyPaneTextField("flexDirection", {
                  label: "Flex Direction",
                  placeholder: "row",
                }),
                PropertyPaneTextField("wrap", {
                  label: "Wrap",
                  placeholder: "wrap",
                }),
                PropertyPaneTextField("justify", {
                  label: "Justify Content",
                  placeholder: "space-evenly",
                }),
                PropertyPaneTextField("align", {
                  label: "Align Items",
                  placeholder: "center",
                }),
                PropertyPaneTextField("gap", {
                  label: "Gap",
                  placeholder: "1rem",
                }),
                PropertyPaneTextField("top", {
                  label: "Top",
                  placeholder: "100px",
                }),
                PropertyPaneTextField("width", {
                  label: "Width",
                  placeholder: "100vw",
                }),
              ],
            },
          ],
        },
      ],
    };
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
}
