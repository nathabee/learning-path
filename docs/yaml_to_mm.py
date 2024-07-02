import yaml
import xml.etree.ElementTree as ET
from datetime import datetime

def create_freeplane_mindmap(yaml_file, output_file):
    # Load data from YAML file
    with open(yaml_file, 'r', encoding='utf-8') as stream:
        try:
            data = yaml.safe_load(stream)
        except yaml.YAMLError as exc:
            print(exc)
            return
    
    # Create the root element
    map_element = ET.Element('map', version="freeplane 1.11.14")

    # Helper function to recursively create nodes
    def create_node(parent, node_data):
        for key, value in node_data.items():
            if isinstance(value, dict):
                # Create a new node
                node = ET.SubElement(parent, 'node', TEXT=key)
                # Recursively create child nodes
                create_node(node, value)
            elif isinstance(value, list):
                # Create a parent node for the list
                node = ET.SubElement(parent, 'node', TEXT=key, FOLDED="true")
                # Create nodes for list items
                for item in value:
                    ET.SubElement(node, 'node', TEXT=item, FOLDED="false")
            else:
                # Create a node with folded text
                node = ET.SubElement(parent, 'node', TEXT=key, FOLDED="true")
                # Add the content as a subnode
                ET.SubElement(node, 'node', TEXT=value, FOLDED="false")

    # Create the mind map structure
    create_node(map_element, data)

    # Save to file with pretty formatting (CR after each element)
    def indent(elem, level=0):
        """In-place prettyprint formatter"""
        i = "\n" + level * "  "
        if len(elem):
            if not elem.text or not elem.text.strip():
                elem.text = i + "  "
            if not elem.tail or not elem.tail.strip():
                elem.tail = i
            for elem in elem:
                indent(elem, level + 1)
            if not elem.tail or not elem.tail.strip():
                elem.tail = i
        else:
            if level and (not elem.tail or not elem.tail.strip()):
                elem.tail = i

    indent(map_element)

    # Save to file
    tree = ET.ElementTree(map_element)
    tree.write(output_file, encoding='utf-8', xml_declaration=True)

# Example usage:
yaml_file = 'learning_path.yaml'
output_file = 'learning_path.mm'
create_freeplane_mindmap(yaml_file, output_file)
