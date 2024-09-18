import unittest
import os
from src.config.config import config

class TestConfigFiles(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """Class-level setup: Initialize configuration items"""
        
        cls.secret_config_items = [
            'ELASTIC_CONNECTION_STRING','KAFKA_CONNECT_URL','MONGODB_URI'
        ]

        cls.config_items = [
            'BUILT_AT','MONGO_DATABASE','MONGO_COLLECTIONS',
            'MONGODB_SOURCE_CONNECTOR','KAFKA_TOPIC_PREFIX',
            'ELASTICSEARCH_SINK_CONNECTOR','ELASTICSEARCH_INDEX',
            'REQUEST_TIMEOUT','MAX_RETRIES','RETRY_DELAY'
        ]

    def setUp(self):
        """Re-initialize the config for each test."""
        config._instance = None
        
        # Set Config Folder location
        os.environ["CONFIG_FOLDER"] = "./test/test_config_files"

        # Initialize the Config object
        config.initialize()
        
        # Reset config folder location 
        del os.environ["CONFIG_FOLDER"]

    def test_file_config_items(self):
        for config_value in self.config_items:
            items = config.config_items
            item = next((i for i in items if i['name'] == config_value), None)
            self.assertIsNotNone(item)
            self.assertEqual(item['name'], config_value)
            self.assertEqual(item['from'], "file")
            self.assertEqual(item['value'], "999")

        for config_value in self.secret_config_items:
            items = config.config_items
            item = next((i for i in items if i['name'] == config_value), None)
            self.assertIsNotNone(item)
            self.assertEqual(item['name'], config_value)
            self.assertEqual(item['from'], "file")
            self.assertEqual(item['value'], "secret")

if __name__ == '__main__':
    unittest.main()