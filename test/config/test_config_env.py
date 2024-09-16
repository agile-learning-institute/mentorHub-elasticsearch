import unittest
import os
from src.config.config import config

class TestConfigEnvironment(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """Class-level setup: Initialize configuration items"""
        
        cls.secret_config_items = [
            'ELASTIC_CONNECTION_STRING','KAFKA_CONNECT_URL','MONGODB_URI'
        ]

        cls.config_items = [
            'CONFIG_FOLDER','BUILT_AT','MONGO_DATABASE','MONGO_COLLECTIONS',
            'MONGODB_SOURCE_CONNECTOR','KAFKA_TOPIC_PREFIX',
            'ELASTICSEARCH_SINK_CONNECTOR','ELASTICSEARCH_INDEX',
            'REQUEST_TIMEOUT','MAX_RETRIES','RETRY_DELAY'
        ]

    def setUp(self):
        """Re-initialize the config for each test."""
        # Set all string environment variables to "ENV_VALUE"
        for var in self.config_items + self.secret_config_items:
            os.environ[var] = "999"


        # Initialize the Config object
        config.initialize()
        
        # Reset environment variables 
        for var in self.config_items + self.secret_config_items:
            if os.environ[var]:
                del os.environ[var]


    def test_environment_config_items(self):
        for config_value in self.config_items:
            items = config.config_items
            item = next((i for i in items if i['name'] == config_value), None)
            self.assertIsNotNone(item)
            self.assertEqual(item['name'], config_value)
            self.assertEqual(item['from'], "environment")
            self.assertEqual(item['value'], "999")

    def test_secret_environment_config_items(self):
        for config_value in self.secret_config_items:
            items = config.config_items
            item = next((i for i in items if i['name'] == config_value), None)
            self.assertIsNotNone(item)
            self.assertEqual(item['name'], config_value)
            self.assertEqual(item['from'], "environment")
            self.assertEqual(item['value'], "secret")

if __name__ == '__main__':
    unittest.main()